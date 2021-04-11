/// <reference types="cypress" />

context("testing init", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("loads all podcasts", () => {
    const podcastClass = ".podcastCard";
    cy.get(podcastClass).should("have.length", 14);
    cy.get(podcastClass).each((item) => {
      cy.wrap(item).find(".podcastCard__title").should("not.be.empty");
      cy.wrap(item)
        .find(".podcastCard__date")
        .invoke("text")
        .should("match", /hace \d\d? meses/);
      // cy.wrap(item).find(".podcastCard__description").should("not.be.empty");
    });
  });
});
