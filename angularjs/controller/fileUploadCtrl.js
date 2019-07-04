app.controller("fileUploadController", fileUploadController);

function fileUploadController($scope, $http, $state, $window, $stateParams, toastr, FileSaver) {

    $scope.msg = "hello";
    var id = $stateParams.id;
    console.log("ID:", id);
    $scope.upload = function () {
        console.log("within upload function");
        $scope.myVar = !$scope.myVar;
        console.log("uploaded file:", uploadFile);

        $scope.newemp = {};
        $scope.newemp.file = uploadFile;
        console.log("FILE NAME:", $scope.newemp.file);
        var formData = new FormData();
        formData.append("file", $scope.newemp.file);
        for (var value of formData.values()) {
            console.log("Formdatavalues", value);
        }
        $http.post('http://localhost:4000/emp/', formData, {

            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }

        }).then(function (res) {
            console.log("Response", res);

            $scope.emp = res.data.doc;
            $scope.emp1 = res.data.doc.fname;
            console.log("Scope data isssssss", $scope.emp);

            $scope.manager = res.data.doc1;
            console.log("Scope data isssssss", $scope.manager);
            $scope.arr = [];
            $scope.arr1 = [];
            for (let i = 0; i < $scope.emp.length; i++) {
                for (let j = 0; j < $scope.manager.length; j++) {
                    if ($scope.emp[i].manager_code == $scope.manager[j].emp_code) {
                        console.log("managaercode", $scope.emp[i].manager_code);
                        console.log("managaercode NAmes", $scope.manager[j].fname, $scope.manager[j].lname);
                        $scope.arr1.push($scope.manager[j].emp_code);
                        $scope.arr.push($scope.manager[j].fname);
                        console.log("arr", $scope.arr);
                    }
                }
            }
            console.log("arr---------------emp_code", $scope.arr1);
            console.log("arr---------------fname", $scope.arr);
        })

    }
    $scope.submit = function () {
        console.log("within submit function");
        $scope.data = [];
        console.log("Scope data isssssss", $scope.emp);
        console.log("Scope data isssssss", $scope.manager);
       
        // for (let i = 0; i < $scope.emp.length; i++) {
        //     for (let j = 0; j < $scope.manager.length; j++) {
        //         if ($scope.emp[i].manager_code == $scope.manager[j].emp_code) {
        //             console.log("managaercode", $scope.emp[i].manager_code);
        //             console.log("managaercode NAmes", $scope.manager[j].fname, $scope.manager[j].lname);
        //             // $scope.arr1.push($scope.manager[j].emp_code);
        //             // $scope.arr.push($scope.manager[j].fname);
        //             // console.log("arr", $scope.arr);
        //         }
        //     }
        // }
        // console.log("arr---------------emp_code", $scope.arr1);
        // console.log("arr---------------fname", $scope.arr);
        let data=[];
        data.push( $scope.emp);
        data.push( $scope.manager);
        console.log("DATA PUSH:",data);
        $http.post('http://localhost:4000/upload/', data).then(function (res) {
            console.log("POST RES:", res);
        })
        toastr.success("Data Save In DataBase Successful");
    }
    $scope.delete = function (emp_code) {

        console.log("within delete function", emp_code);
        for (var i in $scope.emp) {
            if ($scope.emp[i].emp_code == emp_code) {
                $scope.emp.splice(i, 1);

            }


        }

    }
    $scope.edit = function (emp_code) {
        console.log("within edit");
        console.log($scope.arr);
        for (var i = 0; i < $scope.arr.length; i++) {
            console.log("within for loop");
            if ($scope.emp[i].emp_code == emp_code) {

                console.log("Nmae", $scope.arr[i]);
                $scope.name = $scope.arr[i];
                console.log("------", $scope.name);
            }
        }
        for (var i in $scope.emp) {
            if ($scope.emp[i].emp_code == emp_code) {
                $scope.newemp = angular.copy($scope.emp[i]);

            }
        }
        console.log($scope.newemp);
    }
    $scope.saveemp = function () {
        if ($scope.newemp.emp_code == null) {

            $scope.newemp.emp_code = emp_code;
            $scope.emp.push($scope.newemp);
        }
        else {
            for (var i in $scope.emp) {
                if ($scope.emp[i].emp_code == $scope.newemp.emp_code) {


                    $scope.emp[i] = $scope.newemp;
                }
            }
        }

    }

    $scope.download = function () {
        console.log("Within DOwnload Function");
        console.log("uploaded file:", uploadFile);
        console.log("uhhhhhhhhhhhh:", uploadFile.File);
        $scope.newemp = {};
        $scope.newemp.file = uploadFile;
        console.log("FILE NAME:", $scope.newemp.file);
        var formData = new FormData();
        formData.append("file", $scope.newemp.file);
        for (var value of formData.values()) {
            console.log("Formdatavalues", value);
        }
        $http.post('http://localhost:4000/download/', formData, {

            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })
            .then(function (res) {

                console.log("Response", res);
                console.log("===============", res.data.doc);


                var data = new Blob([res.data.doc], { type: 'text/plain;charset=utf-8' });
                console.log("DT=====", data);
                FileSaver.saveAs(data, 'employees.xlsx');

            });
    }



}