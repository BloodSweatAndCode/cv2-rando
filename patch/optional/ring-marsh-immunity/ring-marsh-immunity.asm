PHP

; see if ring is equipped
LDA *$4F
CMP #$05
BNE ORIG

; cause zero damage
PLP
LDA #$00
JMP $D354

; original code we replaced
ORIG
PLP
LDA #$01
JMP $D354