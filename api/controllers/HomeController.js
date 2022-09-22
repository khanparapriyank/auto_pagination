/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 const axios = require('axios');

module.exports = {
    
    homeDefault: function (req, res) {
        let i = sails.config.myconf.page_number;
        axios({
            url: "https://englishapi.xynie.com/app-api/v1/photo-gallery-feed-page/page/"+ sails.config.myconf.page_number.toString(),
            method: "get",
        })
        .then(response => {
            sails.config.myconf.newsList = [...sails.config.myconf.newsList , ...response.data.nodes];
            console.log("sails.config.myconf.newsList ----> ", sails.config.myconf.newsList.length);
            console.log("Inside homepage Found ........"+ sails.config.myconf.page_number.toString());
            sails.config.myconf.page_number = sails.config.myconf.page_number + 1
            return res.view("homepage", {
                nodes: sails.config.myconf.newsList,
                isEndPage : sails.config.myconf.isEndPage
            });
        })
        .catch((err) => {
            console.log("Inside homepage ERROR .... ");
            return res.view("homepage", {
                nodes: "",
                isEndPage : false
            });
        });
    },
    //  getYPosition : function(){
    //     if (typeof(window) !== 'undefined') {
    //         var timer = setTimeout(function() {
    //             var top  = window.pageYOffset || document.documentElement.scrollTop
    //             return top;
    //         }, 200);
    //     }
    //   }
   
};



