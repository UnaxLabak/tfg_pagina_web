#include <stdio.h>
#include <string.h>




void escape() {
  char flag[256];
  FILE *flagFile = fopen("/root/flag.txt", "r");

  if (flagFile == NULL) {
    printf("ERROR: No se pudo abrir el archivo de la FLAG.\n");
  }

  fgets(flag, sizeof(flag), flagFile);
  fclose(flagFile);


  printf("######################################################################################\n");
  printf("NIVEL 2 SUPERADO!!!\n");
  printf("FLAG: %s\n", flag);
  printf("######################################################################################\n");
}

void overflow(){
  char buff[32]; 
  printf("Inserta tu payload:");
  gets(buff);
  printf("Buffer content: %s\n", buff);
}


int main() {
  printf("Puede que con escape() haya una forma de salir...\n \n");
  overflow();
  return 0;
}

