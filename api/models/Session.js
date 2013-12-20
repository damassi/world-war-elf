/**
 * Session model stores data pertaining to individual game sessions
 *
 * @author Christopher Pappas
 * @date   12.1.13
 */

module.exports = {

  attributes: {

  	sessionId: {
      type: 'STRING',
      required: true
    },

    desktopSocketId: 'STRING',

    mobileSocketId: 'STRING'

  }
}
