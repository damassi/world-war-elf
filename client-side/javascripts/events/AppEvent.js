/**
 * Global PubSub events
 *
 * @author christopher.pappas@popagency.com
 * @since  11.18.13
 */

var AppEvent = {

  SOCKET_IO_CONNECTED     : 'onSocketIOConnected',
  SOCKET_IO_MESSAGE       : 'onSocketIOMessage',

  DESKTOP_CLIENT_SYNCED : 'onDesktopClientSynched',
  MOBILE_CLIENT_SYNCED  : 'onMobileClientSynced',

  MOBILE_CALIBRATED: 'onMobileCalibrated',

  START_GAMEPLAY : 'onStartGamePlay',
  STOP_GAMEPLAY  : 'onStopGamePlay',

  TICK: 'onTick'

}

module.exports = AppEvent
