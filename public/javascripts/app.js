angular.module('athletes', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.test = 'Who Will Win the NBA MVP This Year?';
    $scope.athletes = [
      {firstName:'James', lastName: "Harden", team: "Houston Rockets", upvotes:5, wins: 6, losses: 0, imgURL: "http://thesportsquotient.com/media/posts/8028/james%20harden%20blogsohard.jpg"},
      {firstName:'Lebron', lastName: "James", team: "Cleveland Cavaliers", upvotes:5, wins: 7, losses: 1, imgURL: "http://www.trbimg.com/img-55b10e35/turbine/la-et-mn-lebron-james-space-jam-2-warner-bros-20150722"},
      {firstName:'Stephen', lastName: "Curry", team: "Golden State Warriors", upvotes:5, wins: 8, losses: 0, imgURL: "http://d2118lkw40i39g.cloudfront.net/wp-content/uploads/2015/06/cd0ymzcznguwzdbhnduynddiytjhm2yyzthlmtjjotqwyyznpwu1nja1yjkzmjy1mjq4nwmwowmxmji2mgmxzmnjzguz.jpeg"},
      {firstName:'Tim', lastName: "Duncan", team: "San Antonio Spurs", upvotes:5, wins: 6, losses: 2, imgURL: "http://i.cdn.turner.com/nba/nba/.element/img/1.0/sect/allstar/profiles/tim_duncan_300.jpg"}
    ];
    $scope.create = function(athlete) {
    return $http.post('/athletes', athlete).success(function(data){
      $scope.athletes.push(data);
    });
    };

    $scope.addAthlete = function() {
      if($scope.firstName === '000') { return; }
      console.log("In addComment with "+$scope.formfirstName);
      $scope.create({
        firstName: $scope.formFirstName,
        lastName:$scope.formLastName,
        team:$scope.formTeam, 
        wins:$scope.formWins, 
        losses:$scope.formLosses, 
        imgURL:$scope.formPlayerImage,
        upvotes: 0,
      });
      $scope.formContent = '';
    };
    $scope.incrementUpvotes = function(athlete) {
      $scope.upvote(athlete);
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

    $scope.upWin = function(athlete) {
      return $http.put('/athletes/' + athlete._id + '/upwin')
        .success(function(data){
          console.log("upWin worked");
          athlete.wins += 1;
        });
    };

    $scope.upLoss = function(athlete) {
      return $http.put('/athletes/' + athlete._id + '/uploss')
        .success(function(data){
          console.log("upLoss worked");
          athlete.losses += 1;
        });
    };
    

  }

]);