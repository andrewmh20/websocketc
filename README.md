# websocketc
Website to provide easy interface between users and their own servers running [websocketd](http://websocketd.com/).

# Details & Use Case
I found that I had command line programs that output text to STDOUT, and I wanted to view that text remotely, including from my phone. One option was ssh-ing into the server everytime, but that didn't give a great view of the terminal, and it could lead to accidentally closing the program or running other commands. I wanted an easy read-only view into what was being sent to STDOUT.

I then found websocketd, which perfectly fit my use case on the server side. However, I still had no way to connect to the websocket server and nicely view the output. Thus came websocketc--a web interface for managing and viewing all my websocketd, or for that matter and websocket servers that are purely sending text.

Websocketc allows you to keep a central list of all your servers, connect to them, save and download the output text.

# Quickstart

Simply go to <https://websocketc.com> and log in. Authentication is securely handled by Google. You can then add,
manage, and connect to any websocket connections that you have exposed to the internet.

# Future Plans

Currently there is just basic functionality working. Some future plans include more robust design, better UI, and 
authentication options besides Google. 


