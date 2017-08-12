angular.module('starter.controllers', [])

/**
 *吐槽控制器
 */
    .controller('TucaoCtrl', function ($scope, $http,$rootScope) {
        $scope.tucaoList = [];
        $scope.next = 0;
        $scope.moreDataCanBeLoaded = 1;
        // 点赞
        $scope.xihuan=function (idd,index) {
            $scope.tucaoList[index].liked=true;
            $scope.tucaoList[index].like_num++;
            $http.get('http://119.28.16.18/tucao_like?data.tid=' + idd + '&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("已fasong");
                    if (response.data.status == 0) {
                        console.log("已喜欢");
                    }
                });



        }
        //上拉加载
        $scope.loadMore = function () {
            if($rootScope.login==1){

                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                        if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                        $scope.next = response.data.next;
                    }
                });
                console.log($rootScope.token);
            }
            else
            {
                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10')
                    .then(function (response) {
                        if (response.data.status == 0) {
                            $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                            if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                            $scope.next = response.data.next;
                        }
                    });

            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$stateChangeSuccess', function () {
            $scope.loadMore();
        });

        $scope.doRefresh = function () {
            $scope.next = 0;
            $scope.tucaoList = [];
            $scope.moreDataCanBeLoaded = 1;
            if($rootScope.login==1)
            {
                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10&data.selfToken='+$rootScope.token)
                    .then(function (response) {
                        if (response.data.status == 0) {
                            $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                            if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                            $scope.next = response.data.next;
                        }
                    });
            }
            else{
                $http.get('http://119.28.16.18/tucao_getList?data.offset=' + $scope.next + '&data.num=10')
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.tucaoList = $scope.tucaoList.concat(response.data.data);
                        if ($scope.next == response.data.next) $scope.moreDataCanBeLoaded = 0;
                        $scope.next = response.data.next;
                    }
                });}
            $scope.$broadcast('scroll.refreshComplete');
        }
    })

    /**
     *吐槽详情控制器
     */
    .controller('TucaoDetailCtrl', function ($scope, $stateParams, $http,$rootScope) {
        $scope.id = $stateParams.id;
         // 点赞
        $scope.xihuana=function () {
            console.log($scope.id);
            $scope.item.liked = true;
            $scope.item.like_num++;
            $http.get('http://119.28.16.18/tucao_like?data.tid=' + $scope.id+ '&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    console.log("已fasong");
                    if (response.data.status == 0) {
                        console.log("已喜欢");


                    }
                });
        }
        $scope.comment=function()
        {
            console.log("我被点击了");

            $http.get('http://119.28.16.18/tucao_addComment?data.tid=' + $scope.id+'&data.comment='+ $scope.data.publishtucaocomment)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;//发表评论成功！！！
                        console.log("发表评论成功了");
                        $scope.data.publishtucaocomment="";

                        $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id+'&data.selfToken='+$rootScope.token)
                            .then(function (response) {
                                if (response.data.status == 0) {
                                    $scope.item = response.data.data;
                                }
                            });

                    }
                });
        }
        if($rootScope.login==1){

            $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id+'&data.selfToken='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                    }
                });
        }
        else
        {
            $http.get('http://119.28.16.18/tucao_getItem?data.tid=' + $scope.id)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                    }
                });
        }

    })

    /**
     *   咨询控制器
     */
    .controller('AskCtrl', function ($scope, $stateParams, $http,$rootScope) {
        $rootScope.askList = [];
        $http.get('http://119.28.16.18/ask_getList')
            .then(function (response) {
                if (response.data.status == 0) {
                    $rootScope.askList = response.data.data;
                }
            });

        $scope.doRefresh = function () {

            $http.get('http://119.28.16.18/ask_getList')
                .then(function (response) {
                    if (response.data.status == 0) {
                        $rootScope.askList = response.data.data;
                    }
                });
            $scope.$broadcast('scroll.refreshComplete');
        }
    })

    /**
     *   咨询详情控制器
     */
    .controller('AskDetailCtrl', function ($scope, $stateParams, $http,$rootScope,$state) {
        $scope.id = $stateParams.id;
        if($rootScope.askList==null) $state.go("tab.ask");
        $scope.answer=function()
        {
            $http.get('http://119.28.16.18/ask_addAnswer?aid=' + $rootScope.askList[$scope.id].aid+'&token='+$rootScope.token+'&detail=' +$scope.data.inputanswer)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;//回答问题成功！！！
                        console.log("回答问题成功了");
                        $scope.data.inputanswer="";


                        $http.get('http://119.28.16.18/ask_getAnswers?aid=' + $rootScope.askList[$scope.id].aid)
                            .then(function (response) {
                                if (response.data.status == 0) {
                                    $scope.item = response.data.data;
                                    $scope.question=$rootScope.askList[$scope.id];
                                    console.log("请求回答成功");

                                    console.log( $scope.item);
                                }
                            });
                    }
                });
        }
        $http.get('http://119.28.16.18/ask_getAnswers?aid=' + $rootScope.askList[$scope.id].aid)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                    $scope.question=$rootScope.askList[$scope.id];
                    console.log("请求回答成功");

                    console.log( $scope.item);
                }
            });
    })


    /**
     *   通知控制器
    */
    .controller('NotifyCtrl', function ($scope, $http) {

        $scope.notifyList = [];

        $http.get('http://119.28.16.18/notification_getList')
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.notifyList = response.data.data;
                }
            });

        $scope.doRefresh = function () {
            $scope.next = 0;
            $scope.notifyList = [];
            $scope.moreDataCanBeLoaded = 1;
            $http.get('http://119.28.16.18/notification_getList')
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.notifyList = response.data.data;
                    }
                });
            $scope.$broadcast('scroll.refreshComplete');
        }
    })
    /**
     *   通知详情控制器
     */
    .controller('NotifyDetailCtrl', function ($scope, $stateParams, $http) {
        $scope.oid = $stateParams.oid;
        $http.get('http://119.28.16.18/notification_getByOid?oid=' + $scope.oid)
            .then(function (response) {
                if (response.data.status == 0) {
                    $scope.item = response.data.data;
                }
            });
    })
    
       
    /*
	 * 登录控制器
	 */
    .controller('LoginCtrl', function ($scope, $stateParams, $http,$state,$rootScope) {
        $scope.data=[];
        $scope.loginfun=function()
        {
            console.log( $scope.data.loginusername);
            $http.get('http://119.28.16.18/user_login?name=' + $scope.data.loginusername + '&password=' + hex_md5($scope.data.loginpassword))
                .then(function (response) {
                    if (response.data.status == 0) {
                        var storage = window.localStorage;
                        storage.setItem("token", response.data.token);
                        storage.setItem("login",1);
                        $rootScope.token=response.data.token;
                        $rootScope.login=1;
                        $rootScope.voidname=0;
                        $rootScope.wrongcode=0;
                        $state.go("tab.tucao");
                    }
                    else if (response.data.status == 203) {
                        $rootScope.voidname=1;
                    }
                    else if (response.data.status == 204) {
                        $rootScope.wrongcode=1;
                    }
                });


        }
    })
    /*
	 * 登录fabiao控制器
	 */
    .controller('LoginfabiaoCtrl', function ($scope, $stateParams, $http,$state,$rootScope) {
        $scope.data=[];
        $scope.loginfun=function()
        {
            $http.get('http://119.28.16.18/user_login?name=' + $scope.data.loginusername + '&password=' + hex_md5($scope.data.loginpassword))
                .then(function (response) {
                    if (response.data.status == 0) {
                        var storage = window.localStorage;
                        storage.setItem("token", response.data.token);
                        storage.setItem("login",1);
                        $rootScope.token=response.data.token;
                        $rootScope.login=1;
                        $rootScope.voidname=0;
                        $rootScope.wrongcode=0;
                        history.go(-1);
                    }
                    else if (response.data.status == 203) {
                        $rootScope.voidname=1;
                    }
                    else if (response.data.status == 204) {
                        $rootScope.wrongcode=1;
                    }
                });


        }
    })

	/*
	 * 注册控制器
	 */
	.controller('EnrollCtrl', function ($scope, $stateParams, $http,$state,$rootScope) {
        $scope.data=[];
        $scope.data.sexSelect="0";
        $scope.enrollfun = function ()
        {
            console.log( $scope.data.sexSelect);
             $http.get('http://119.28.16.18/user_register?name=' + $scope.data.enrollusername + '&password=' + hex_md5($scope.data.enrollpassword) + '&gender='+$scope.data.sexSelect )
              .then(function (response) {
                 if (response.data.status == 0) {
                    var storage = window.localStorage;
                     $rootScope.samename=0;
                     storage.setItem("token", response.data.token);
                     storage.setItem("login",1);
                     $rootScope.token=response.data.token;
                     $rootScope.login=1;
                     $state.go("tab.tucao");
                    console.log(storage.getItem("token"));
                     $scope.data.enrollusername="";
                     $scope.data.enrollpassword="";

                }
                  else if (response.data.status == 201) {
                     $rootScope.samename=1;
                  }
            });
        }
    })
    /*
	 * 发表吐槽页面控制器
	 */
    .controller('PublishTucaoCtrl', function ($scope, $stateParams, $http,$rootScope,$state,$window) {
        $scope.data=[];
        $scope.fabiaotucaofun=function(){
            $http.get('http://119.28.16.18/tucao_add?data.token='+$rootScope.token+'&data.content='+$scope.data.fabiaotucao)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                        $state.go("tab.tucao");
                        $window.location.reload();
                        console.log("发表吐槽成功！");
                        $scope.data.fabiaotucaofun="";
                    }
                });
        }
    })

    /*
     * 发表咨询页面控制器
     */
    .controller('PublishZixunCtrl', function ($scope, $stateParams, $http,$rootScope,$state,$window) {
        $scope.data=[];
        $scope.fabiaozixun=function(){

            $http.get('http://119.28.16.18/ask_add?title=null&detail='+$scope.data.fabiaozixun+'&token='+$rootScope.token)
                .then(function (response) {
                    if (response.data.status == 0) {
                        $scope.item = response.data.data;
                        $state.go("tab.ask");
                        $window.location.reload();
                        console.log("发表咨询成功！")
                        $scope.data.fabiaozixun="";
                    }
                });
        }
    })

    /*
     * 个人中心控制器
     */
    .controller('PersonCtrl', function ($scope, $stateParams, $http,$state,$rootScope) {
        $scope.quitlogin=function () {
            var storage = window.localStorage;
            storage.clear();
            $rootScope.login=0;
            $rootScope.token="";
            $state.go("tab.tucao")
        }
    });
	