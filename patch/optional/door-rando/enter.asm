LDA *$30
STA $6100
BEQ TOWN

LDA *$50
CLC
ADC #$1B
BNE AREA

TOWN
TYA

AREA
ASL A
TAY
LDA $<%= table %>,Y
STA *$30
INY
LDA $<%= table %>,Y
RTS
