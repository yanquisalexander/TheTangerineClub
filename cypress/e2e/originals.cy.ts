import { MUSICS } from "@/consts/Music";

it('have all music cards in the page (From MUSICS const)', () => {
    cy.visit('/originals');

    MUSICS.forEach((music) => {
        cy.get(`[data-music-id="${music.id}"]`).should('exist');
    });
})

it('render lyrics if music has lyrics', () => {
    const musicsWithLyrics = MUSICS.filter((music) => music.hasLyrics);

    if (!musicsWithLyrics) {
        return;
    }

    for (let i = 0; i < musicsWithLyrics.length; i++) {
        cy.visit(`/originals/${musicsWithLyrics[i].id}`);

        cy.get('#lyrics-container').should('exist');
    }
})