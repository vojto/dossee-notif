import net.rcode.wsclient.*;
import net.rcode.wsclient.WebSocket.Event;

class Client {
  public static void main(String args[]) throws InterruptedException {
    WebSocket ws = new WebSocket("ws://127.0.0.1:5001/");

    ws.addListener(new WebSocket.EventListener() {
      @Override
      public void handleEvent(Event event) {
        if (event.getType() == WebSocket.EVENT_MESSAGE) {
          Message msg       = event.getMessage();
          CharSequence text = msg.getMessageText();
          System.out.println("Received message: " + text);
        } else if (event.getType() == WebSocket.EVENT_ERROR) {
          System.out.println("Error: " + event.getError());
        }
      }
    });

    ws.start();
    // Thread.sleep(1000);
    // ws.close();
    ws.waitForReadyState(WebSocket.CLOSED);
    System.out.println("Closed.  ReadyState=" + ws.getReadyState());
  }
}