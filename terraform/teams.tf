locals {
  teams = flatten([
    for member in local.members : [
      for team in member["github_teams"] : team
    ]
  ])
}

resource "github_team" "team" {
  for_each = toset(local.teams)
  name     = each.value
}