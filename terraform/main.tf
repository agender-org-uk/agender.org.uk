terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  cloud {
    organization = "agender-org-uk"
    workspaces {
      name = "agender-org-uk"
    }
  }
}

provider "github" {
  owner = "agender-org-uk"
}
