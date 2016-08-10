import * as mocha from "mocha";

const expect = require("chai").expect;

import * as express from "express";
import * as superagent from "superagent";

import authrouter from "../index";


const app = express();
const server = require("http").Server(app);





before(function () {

    app.use('/auth', authrouter({ secret: "tt", app_id: "energytrack", couchdb: "https://couchman.kernel.online" }));

    server.listen(21569);

})


describe("authorize with couchdb", function () {

    describe("authorization object", function () {
        this.timeout(30000);

        it("verificate authorization", function (done) {
            superagent.get("localhost:21569/auth/authorize/couchdb/testconsumi/testconsumi0101").end((err, res) => {


                if (err) {
                    done(err);
                } else if (res && res.body && !res.body.error) {

                    const obj = res.body;
                    expect(obj).to.be.an('Object');
                    expect(obj.error).to.not.exist;

                    done()

                } else {
                    done(res.body.error)

                }
            })

        })


    })
})


after(function () {

    server.close();

})


