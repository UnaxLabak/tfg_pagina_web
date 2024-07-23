#include <signal.h>
#include <stdio.h>
#include <string.h>
int main(){
        char buff2[40];
        char buff1[20];


    printf("Es imposible pasar el nivel sin saber la clave secreta >:) \n \n");
    printf("Insertar clave secreta: ");

        strncpy(buff2, "ddddddddddddddd", 20);
        gets(buff1);

        if (0 == strncmp(buff1, buff2, 20)){
                printf("Sesión iniciada, bienvenido!\n");

        if(strlen(buff1) > sizeof(buff1)){
            printf("######################################################################################\n");
            printf("NIVEL 2 SUPERADO!!!\n");
            printf("######################################################################################\n");
        }else{
            printf("Buen intento, pero prueba a desbordar el buffer, igual puedes cambair la clave con eso...\n");

        }

        }else{
        printf("\n");
                printf("Clave incorrecta\n \n");
        printf("Quizas puedes manipular la clave secreta desbordando la memoria...");
        }

    if(sizeof(buff1) == 100){
        printf("MENSAJE SECRETO: Si lees esto es que estas analizando hexdump en busca de pistas, sigue asi!! Usa gdb para analizar la estructura de la pila :)\n");

    }

        raise(SIGINT);
        return 0;
}

