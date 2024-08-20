it('renders twitch stream when user is streaming', () => {
    /* 
    * Visit the home page with the forceShowTwitch query parameter set to true
    * This will force the page to show the twitch iframe even if the user is not streaming
    */
    cy.visit('/?forceShowTwitch=true');

    /* 
    * Check if the twitch-stream web component exists
    */

    cy.get('twitch-stream').should('exist');
})
