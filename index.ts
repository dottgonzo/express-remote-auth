import aut from "remote-auth";

import * as express from "express";

export default function (o: { secret: string, app_id: string, couchdb: string }) {

    const authmodule = new aut({ secret: o.secret, app_id: o.app_id, couchdb: o.couchdb });

    const Router = express.Router();


    Router.get("/authorize/:provider/:user/:password", (req, res) => {

        const params = req.params;

        authmodule.authorize({ provider: params.provider, user: params.user, password: params.password }).then((a) => {
            res.send(a)
        }).catch((err) => {
            res.send({error:err})
        })


    })

return Router

}


