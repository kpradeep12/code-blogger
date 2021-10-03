comment=${1-save}
git add --all -- ':!docs'
git commit -m "$comment"
git push origin master