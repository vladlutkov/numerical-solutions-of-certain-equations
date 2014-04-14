angular.module "beta", [
  "$routeProvider"
  ($routeProvider) ->
    $routeProvider.when "/beta",
      templateUrl: "lib/modules/beta/views/beta.html"
      controller: BetaController
]