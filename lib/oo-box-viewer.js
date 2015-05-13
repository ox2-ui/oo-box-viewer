Template.ooBoxViewer.onCreated(function () {
  var self = this;
  if (!self.data) {
    console.log('%c ooBoxViewer no data passed to component   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
  }
  self.isLoading = new Blaze.ReactiveVar(true);
  self.currentPage = new Blaze.ReactiveVar(1);
  self.activePage = new Blaze.ReactiveVar(false);
});

Template.ooBoxViewer.onRendered(function () {
  var self = this;
  var data = self.data;
  var instance = Template.instance();

  console.log('%c data.sessionId   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', data.sessionId);

  self.viewer = Crocodoc.createViewer(self.firstNode, {
      url: 'https://view-api.box.com/1/sessions/' + data.sessionId + '/assets',
      layout: Crocodoc.LAYOUT_PRESENTATION,
      page: 1,
      plugins: {
          realtime: {
              url: "https://view-api.box.com/sse/" + data.sessionId
          },
          fullscreen: {}
      }
  });
  self.viewer.load();

  self.viewer.on('ready', function(e) {
    console.log('%c READY   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;');
    console.log('the viewer is ready, and the document has ' + e.data.numPages + ' pages');
    console.log('%c e   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
      _.delay(function() {
          self.isLoading.set(false);
          // $('.viewer').addClass('fade-in');
      }, 500);
  });

  self.viewer.on('pagefocus', function(e) {
    console.log('%c e  FOCUS ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', e);
    instance.activePage.set(e.data.page)
  });


  self.autorun(function() {
    self.viewer.scrollTo(Template.instance().currentPage.get());
  });

});

Template.ooBoxViewer.helpers({
  isLoading : function () {
   return Template.instance().isLoading.get();
  }
});

Template.ooBoxViewer.events({
  'click .js-nextPage' : function (e, t) {
    t.viewer.scrollTo(Crocodoc.SCROLL_NEXT);
  },
  'click .js-prevPage' : function (e, t) {
    t.viewer.scrollTo(Crocodoc.SCROLL_PREVIOUS);
  }
});
