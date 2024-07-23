#include <stdio.h>
#include <string.h>

char *llave = "desactivada";

void escape() {
  char flag[256];
  FILE *flagFile = fopen("/root/flag.txt", "r");

  if (flagFile == NULL) {
    printf("ERROR: No se pudo abrir el archivo de la FLAG.\n");
  }

  fgets(flag, sizeof(flag), flagFile);
  fclose(flagFile);


  if(strcmp(llave,"activada") == 0){
        printf("######################################################################################\n");
        printf("NIVEL 3 SUPERADO!!!\n");
        printf("FLAG: %s\n", flag);
        printf("######################################################################################\n");
  }else{
        printf("llave no activada");
  }

}

void activarKey(){
  llave = "activada";
}

void overflow(){
        char buff[24]; 
        printf("Inserta tu payload:");
        gets(buff);
        printf("Buffer content: %s\n", buff);
}


int main() {
  printf("Necesitas una llave para escapar...\n \n");
  overflow();


  return 0;
}

