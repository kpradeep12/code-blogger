comment=${1-publish}
bundle exec jekyll clean
JEKYLL_ENV=production bundle exec jekyll build
git add -A
git commit -m "$comment"
git push origin master
