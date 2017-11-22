//for loop
loop1:
for(int i=0; i<3; i++){
	loop2:
	for(int j=0; j<3; j++){
		if(i ==j){
			break loop2;
		}
	}
}