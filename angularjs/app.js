var uploadFile;
var app = angular.module("myApp", ['toastr', 'ui.router', 'ngFileSaver']).config(($stateProvider, $httpProvider, $urlRouterProvider) => {
    $stateProvider.state("fileUpload", {
        url: "/fileUpload",
        templateUrl: "fileUpload.html",
        controller: "fileUploadController",
        controllerAs: 'fileUploadCtrl'
    }).state("edit", {
        url: "/edit",
        templateUrl: "edit.html",
        controller: "editController",
        controllerAs: "editCtrl"
    })
})
function FileUpload(event) {
    console.log(event);
    uploadFile = event.target.files[0];
    console.log("file:", uploadFile);
}