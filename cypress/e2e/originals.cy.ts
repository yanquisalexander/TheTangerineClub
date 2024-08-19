import { MUSICS } from "@/consts/Music";

it('have all music cards in the page (From MUSICS const)', () => {
    cy.visit('/originals');

    MUSICS.forEach((music) => {
        cy.get(`[data-music-id="${music.id}"]`).should('exist');
    });
})