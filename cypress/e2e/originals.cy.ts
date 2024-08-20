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
        cy.get('#lyrics-container').should('not.be.empty');
    }
})
it('user can navigate to music page by clicking on music card (from /originals)', () => {
    cy.visit('/originals');
    cy.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    MUSICS.forEach((music) => {
        cy.get(`a[href="/originals/${music.id}"]`).click();
        cy.url().should('include', `/originals/${music.id}`);
        cy.go('back');
    });
})

