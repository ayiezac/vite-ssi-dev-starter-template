globalThis.$(() => {
  const mobile_description_btn = globalThis.$(".mobile-description-btn");
  const share_button_desktop = globalThis.$("#share-button-desktop");
  const women_content = globalThis.$(".women-content");
  const sidebar = globalThis.$(".sidebar");
  const womens_profile_events2_center = globalThis.$(".womens-profile-events2 center");
  const women_img = globalThis.$(".women-img");
  const women_desc = globalThis.$(".women-desc");

  mobile_description_btn
    .removeAttr("data-toggle")
    .attr("data-bs-toggle", "collapse");
  share_button_desktop.removeAttr("data-toggle").attr("data-bs-toggle", "dropdown");
  women_content.addClass("col-md-8 col-sm-12");
  sidebar.addClass("col-md-4 col-sm-12");
  womens_profile_events2_center.addClass("ratio ratio-21x9");
  women_img.removeClass("col-sm-6").addClass("col-sm-12");
  women_desc.removeClass("col-sm-6").addClass("col-sm-12");
});
