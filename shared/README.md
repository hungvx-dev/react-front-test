# mc sharing

# Implement

- `git submodule init`
- `git submodule add -f git@bitbucket.org:team-card/mc-data.git src/shared`
- `git config -f .gitmodules submodule.shared.branch develop`
- `git submodule foreach --recursive git pull`

### Ignore new commits for git submodule

- `git submodule update`

Note: có thể sử dụng https của git
