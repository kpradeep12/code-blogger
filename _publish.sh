bundle exec jekyll clean
JEKYLL_ENV=production bundle exec jekyll build
git add -A
git commit -m "update"
git push origin master
