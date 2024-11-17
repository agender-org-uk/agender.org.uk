locals {
  members_json = jsondecode(file("${path.module}/../data/members.json"))
  members      = local.members_json["members"]

  team_members = flatten([
    for member in local.members : [
      for team in member["github_teams"] : {
        name = member["github_username"]
        team = team
        role = member["github_role"] == "admin" ? "maintainer" : "member"
      }
    ]
  ])
}

resource "github_membership" "membership" {
  for_each = tomap({ for member in local.members :
    member["github_username"] => member
  })

  username = each.key
  role     = each.value["github_role"]
}

resource "github_team_membership" "name" {
  for_each = tomap({
    for team_member in local.team_members : "${team_member["name"]}_${team_member["team"]}" => team_member
  })

  username = each.value["name"]
  team_id  = github_team.team[each.value["team"]].id
  role     = each.value["role"]
}
