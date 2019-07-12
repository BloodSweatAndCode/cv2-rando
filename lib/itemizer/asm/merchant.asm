PHP

LDA *$7F

CMP #$32
BNE HOLY_W
<%= whiteCrystal %>
JMP $9999

HOLY_W CMP #$37
BNE DAGGER
<%= holyWater %>
JMP $9999

DAGGER CMP #$36
BNE G_TOP
<%= dagger %>
JMP $9999

G_TOP CMP #$2F
BNE L_TOP
LDA *$50
CMP #$0C
BNE G_ALBA
<%= garlicAljiba %>
JMP $9999
G_ALBA <%= garlicAlba %>
JMP $9999

L_TOP LDA *$7F
CMP #$30
BNE O_TOP
LDA *$50

CMP #$0E
BNE L_ALBA
<%= laurelsAljiba %>
JMP $9999

L_ALBA CMP #$10
BNE L_ONDO
<%= laurelsAlba %>
JMP $9999

L_ONDO CMP #$13
BNE L_DOIN
<%= laurelsOndol %>
JMP $9999

L_DOIN CMP #$15
BNE L_NONE
<%= laurelsDoina %>
L_NONE JMP $9999

O_TOP LDA *$7F
CMP #$1D
BEQ DO_OAK
JMP $9999
DO_OAK LDA *$50

CMP #$07
BNE O_HEAR
<%= oakRib %>
JMP $9999

O_HEAR CMP #$08
BNE O_EYE
<%= oakHeart %>
JMP $9999

O_EYE CMP #$09
BNE O_NAIL
<%= oakEye %>
JMP $9999

O_NAIL CMP #$0A
BNE O_RING
<%= oakNail %>
JMP $9999

O_RING CMP #$06
JMP $9999
<%= oakRing %>

PLP

; z_should_be_empty
LDA #$1

RTS
