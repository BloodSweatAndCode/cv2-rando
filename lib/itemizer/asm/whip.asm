PHP

PLA
STA $6001
PLA 
STA $6002
PHA 
PHA

TYA
PHA

LDY #$00

CHECK LDA $6010,Y
CMP $6001
BNE NEXT

CHECK LDA $6011,Y
CMP $6002
BNE NEXT

LDA $6012,Y
CMP *$30
BNE NEXT

LDA $6013,Y
CMP *$50
BNE NEXT

LDA *$51
AND #$7
STA $6000
LDA $6014,Y
CMP $6000
BNE NEXT

BEQ DONE

NEXT CPY #$C
BEQ WHIP
INY
INY
INY
INY
INY
BNE CHECK

WHIP LDA $434
ASL A
ASL A
CLC
ADC $434
TAY
LDA $6001
STA $6010,Y
LDA $6002
STA $6011,Y
LDA *$30
STA $6012,Y
LDA *$50
STA $6013,Y
LDA *$51
AND #$7
STA $6014,Y
INC $434

DONE 
PLA
TAY
PLP

LDA $434

RTS
