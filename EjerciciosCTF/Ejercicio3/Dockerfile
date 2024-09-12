FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && apt-get install -y \
    socat \
    gdb \
    && rm -rf /var/lib/apt/lists/*

# Copy the compiled program into the container
COPY level3 /root/level3

# Set the working directory
WORKDIR /root

# Ensure ASLR is disabled and start socat
CMD sh -c 'echo $FLAG > /root/flag.txt && while true; do echo "Waiting for connection..."; socat TCP-LISTEN:$PORT,reuseaddr,fork EXEC:"/root/level3",pty,stderr,setsid,sigint,sane; done'
