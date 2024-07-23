FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && apt-get install -y \
    socat \
    && rm -rf /var/lib/apt/lists/*

# Copy the compiled program into the container
COPY level1 /root/level1

# Set the working directory
WORKDIR /root

# Disable ASLR and start socat
CMD sh -c 'echo 0 > /proc/sys/kernel/randomize_va_space && echo $FLAG > /root/flag.txt && while true; do echo "Waiting for connection..."; socat TCP-LISTEN:$PORT,reuseaddr,fork EXEC:"/root/level1",pty,stderr,setsid,sigint,sane; done'
