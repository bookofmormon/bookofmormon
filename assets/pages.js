
module.exports = exports = {
  nav: [
    {
      path: '/',
      name: 'Home'
    }, {
      path: '#about',
      name: 'About'
    }, {
      path: 'https://github.com/bookofmormon/bookofmormon/issues',
      name: 'Issues',
      target: '_blank'
    /** }, {
      path: '/settings',
      icon: 'icon-cog'
    **/
    }, {
      path: 'https://github.com/bookofmormon/bookofmormon/',
      target: '_blank',
      icon: 'icon-github'
    }
  ],
  subNav: [
    {
      path: '/',
      title: 'Author'
    /*
    }, {
      path: '/reference/',
      match: true,
      title: 'Reference'
    */
    }
  ],
  routes: {
    '/': 'Author'
    /*
    '/reference/': 'ReferenceView',
    '/reference/:id': 'ReferenceView',
    // '/settings': 'Settings'
    */
  }
};

