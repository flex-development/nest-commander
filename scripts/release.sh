#!/bin/sh

set -e

# Local Release Workflow
#
# 1. run typecheck
# 2. run tests
# 3. pack project
# 4. run postbuild typecheck
# 5. analyze types
# 6. print package size report
# 7. get release version data
# 8. get release branch name
# 9. create release branch
# 10. push release branch
# 11. cleanup
#
# References:
#
# - https://github.com/arethetypeswrong/arethetypeswrong.github.io

yarn typecheck
yarn test:cov
yarn pack
yarn check:types:build
attw package.tgz
yarn pkg-size
RELEASE_VERSION=$(grease bump -j $@)
RELEASE_BRANCH=release/$(jq .version -r <<<$RELEASE_VERSION)
git branch $RELEASE_BRANCH
git push origin --no-verify --set-upstream $RELEASE_BRANCH
yarn clean:pack
