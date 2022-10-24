#!/usr/share/rvm/rubies/ruby-3.0.0/bin/ruby
# SIMPLE RUBY ECHO SERVER EXAMPLE
def say(msg)
  STDOUT.puts msg
  STDOUT.flush
end

def input
  STDIN.gets.chomp
end


command = ''
while command != 'exit'
  command = input
  say command
end
