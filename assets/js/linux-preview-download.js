(function () {
  var links = document.querySelectorAll('a[data-linux-preview]');
  if (!links.length) return;

  fetch('https://api.github.com/repos/off-grid-ai/OGAD/releases?per_page=100', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (response) {
      if (!response.ok) throw new Error('GitHub releases unavailable');
      return response.json();
    })
    .then(function (releases) {
      var betas = releases.filter(function (release) {
        return release.prerelease && !release.draft && /-beta\./.test(release.tag_name);
      }).sort(function (a, b) {
        return Date.parse(b.published_at) - Date.parse(a.published_at);
      });

      links.forEach(function (link) {
        var format = link.getAttribute('data-linux-preview');
        var suffix = format === 'AppImage' ? '.AppImage' : '_amd64.deb';
        var asset;
        betas.some(function (release) {
          asset = release.assets.find(function (item) {
            return item.name.endsWith(suffix) && item.state === 'uploaded';
          });
          return Boolean(asset);
        });
        if (asset) link.href = asset.browser_download_url;
      });
    })
    .catch(function () {
      // The links still open GitHub's beta release list.
    });
}());
