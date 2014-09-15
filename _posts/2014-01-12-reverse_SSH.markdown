---
layout: post
title: Reverse SSH Tunnel
date:   2014-01-12
---
Here's an interesting thing I can across recently at work. We are using the PayPal API as a payment gateway on one of our client projects, but were having problems getting the callback from the API to our local dev machines.

**Solution:** Reverse SSH tunneling

By setting up a reverse SSH tunnel from our local machine to a public facing server, we can say that anything received on `public_server:2200` should be passed straight onto `local_machine:2100`. We can then give the PayPal API a callback URL of our public server which will be received by the app on our local machine.

![Reverse SSH Network Diagramm]({{ site.url }}/assets/img/reverse_ssh.png "Reverse SSH Network Diagram")

First you need to ensure that ports forwarded can be listened to off-host by adding `GatewayPorts yes` to your in `/etc/ssh/sshd_config`. [[1]]

 Then you can execute the following SSH command *on your local machine*:

    ssh -N -T -R 2200:localhost:2100 public_server

*   `-R` specifies that we are forwarding to a remote host.
    *   `2200` is the port on the public server
    *   `localhost:2100` is port for the application on your local machine
    *   `public_server` is the IP of your public server
*   `-N` specifies that we don't want to execute any commands, just forward ports
*   `-T` specifies that the pseudo-tty allocation should be disabled

Happy reverse tunneling :-)

[1]: http://www.snailbook.com/faq/gatewayports.auto.html "Gateway Ports"