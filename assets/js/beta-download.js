(function () {
  var links = document.querySelectorAll('a[data-beta-download]');
  if (!links.length) return;

  var suffixes = {
    dmg: '.dmg',
    exe: '-setup.exe',
    AppImage: '.AppImage',
    deb: '_amd64.deb'
  };

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
        var suffix = suffixes[link.getAttribute('data-beta-download')];
        if (!suffix) return;
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
      // The links keep their pinned beta download.
    });
}());
