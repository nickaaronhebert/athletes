angular.module('athletes', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.showModal = false;
    $scope.test = 'Who Will Win the NBA MVP This Year?';

    $scope.athletes = [
    ];

    $scope.createAthlete = function(athlete) {
    return $http.post('/athletes', athlete).success(function(data){
      $scope.athletes.push(data);
    });
    };
        $scope.addAthlete = function() {
      if($scope.firstName === '000') { return; }
      console.log("In addComment with "+$scope.formfirstName);
      $scope.createAthlete({
        firstName: $scope.formFirstName,
        lastName:$scope.formLastName,
        team:$scope.formTeam, 
        wins:$scope.formWins, 
        losses:$scope.formLosses, 
        imgURL:$scope.formPlayerImage,
        upvotes: 0,
        games: [{
          
        }]
        
      });
      $scope.formContent = '';
    };
    $scope.addGame = function(athlete) {
      console.log(athlete.wins);
    };


    $scope.incrementUpvotes = function(athlete) {
      console.log(athlete.wins)
      $scope.upvote(athlete);
    };
    $scope.downvotes = function(athlete) {
      $scope.downvote(athlete);
    };
    $scope.incrementWins = function(athlete) {
      console.log("I am in the increment Vote function")
      $scope.upWin(athlete);
    };
    $scope.incrementLosses = function(athlete) {
      $scope.upLoss(athlete);
    };
     $scope.getAll = function() {
    return $http.get('/athletes').success(function(data){
      angular.copy(data, $scope.athletes);
    });
    };

    $scope.getAll();

    $scope.upvote = function(athlete) {
      return $http.put('/athletes/' + athlete._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          athlete.upvotes += 1;
        });
    };

    $scope.downvote = function(athlete) {

      return $http.put('/athletes/' + athlete._id + '/downvote')
        .success(function(data){
          console.log("downvote worked");
          athlete.upvotes -= 1;
        });
    };

    $scope.upWin = function(athlete) {
      return $http.put('/athletes/' + athlete._id + '/upwin')
        .success(function(data){
          console.log("upWin worked");
          athlete.wins += 1;
        });
    };

    $scope.upLoss = function(athlete) {
      console.log(athlete._id);
      return $http.put('/athletes/' + athlete._id + '/uploss')
        .success(function(data){
          console.log("upLoss worked");
          athlete.losses += 1;
        });
    };
    $scope.addGameToList = function(athlete) {
      console.log ("I made it!");
      console.log(athlete._id);
      return $http.put('/athletes/' + athlete._id + '/insertgame')
        .success(function(data){
          console.log("upLoss worked");
          athlete.games.push({
            myteam: $scope.formMyTeam
          })
        });
    };
    

  }

]);