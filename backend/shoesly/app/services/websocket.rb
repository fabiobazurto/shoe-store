require 'faye/websocket'
require 'eventmachine'
require 'json'

# Name:  Notification
# Responsable for: Send messages to the websocket
class Websocket
  def self.send(message)
    
      ws = Faye::WebSocket::Client.new('ws://127.0.0.0:8080/')
      ws.on :open do
        puts message


      end

  rescue
    p "something wrong"
  end
end
