const functions = require('firebase-functions');
// 環境変数に定義したシークレットキーを変数に格納する
const stripe = require('stripe')(functions.config().stripe.key)

// corsのインポート(他のドメインからもアクセス可能)
const cors = require('cors');

// APIが叩かれた時にレスポンスを返す処理(定石)
const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(body)
    });
};

// 顧客を登録するAPIを作成する関数の作成
exports.stripeCustomer = functions.https.onRequest((req, res) => {
    // corsの利用(別のドメインを超えて処理ができるようになる)
    const corsHandler = cors({origin: true});
    corsHandler(req, res, ()=>{
        // POSTメソットかの判定
        if(req.method !== 'POST'){
            sendResponse(res, 405, {error: 'POSTメソットで送ってください'})}
        // POSTが叩かれた場合の処理を以下に記述
        return stripe.customers.create({
                description: 'EC App demo user',
                email: req.body.email,
                metadata: {userId: req.body.userId},
                payment_method: req.body.paymentMethod
            }).then((customer) => {
                sendResponse(res, 200, customer)
            }).catch((error)=>{
                sendResponse(res, 500, {error: error})
            })
        })   
})