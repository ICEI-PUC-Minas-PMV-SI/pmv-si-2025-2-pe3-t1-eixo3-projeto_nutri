# 3. DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE

## 3.1 Objetivos deste documento
Descrever e especificar as necessidades dos usuários que buscam uma alimentação equilibrada e controle de indicadores de saúde, que devem ser atendidas pela aplicação web NUTRI.

## 3.2 Escopo do produto

### 3.2.1 Nome do produto e seus componentes principais
O produto será denominado NUTRI. Ele será uma aplicação web composta pelos seguintes módulos principais:

Módulo de Gestão de Alimentos e Receitas: Para cadastro e consulta de ingredientes e receitas.

Módulo de Análise Nutricional e Metabólica: Para avaliação de refeições e dietas, com foco em macronutrientes, micronutrientes e impacto glicêmico.

Módulo de Planejamento e Acompanhamento: Para montagem de planos alimentares e registro de indicadores de saúde.

Módulo de Perfil do Usuário: Para gestão de dados pessoais, metas e preferências.

### 3.2.2 Missão do produto
Capacitar os usuários a gerenciar proativamente sua saúde nutricional, permitindo o cadastro, análise e acompanhamento de receitas, refeições e dietas. A missão é traduzir conhecimento científico sobre o impacto metabólico dos alimentos (como a resposta glicêmica e de insulina) em uma ferramenta prática e acessível para o dia a dia, promovendo decisões alimentares informadas.

### 3.2.3 Limites do produto
O NUTRI não substitui a orientação de um profissional de saúde e não realiza prescrições dietéticas. O sistema não fará integração direta com dispositivos de monitoramento de saúde (como monitores contínuos de glicose), não incluirá funcionalidades de e-commerce para compra de ingredientes, nem servirá como plataforma de teleconsulta com nutricionistas.

### 3.2.4 Benefícios do produto

| # | Benefício | Valor para o Cliente |
|--------------------|------------------------------------|----------------------------------------|
|1	| Tomada de Decisão Alimentar Informada |	Essencial |
|2 | Facilidade no Controle da Saúde Metabólica (glicemia, colesterol, etc.) | Essencial | 
|3 | Aplicação Prática da Ciência Nutricional no Dia a Dia | Essencial | 
|4	| Acesso a Receitas Personalizadas e Saudáveis	| Recomendável | 

## 3.3 Descrição geral do produto

### 3.3.1 Requisitos Funcionais

| Código | Requisito Funcional (Funcionalidade) | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| RF1 | Gerenciar Perfil de Usuário |	Permitir o cadastro, alteração e exclusão do perfil do usuário, incluindo dados pessoais, metas de saúde (ex: controle de glicemia, perda de peso) e restrições alimentares. |
| RF2 |	Gerenciar Alimentos	| 	Permitir a consulta de alimentos em uma base de dados nutricional e o cadastro de novos alimentos pelo usuário. |
| RF3	| Gerenciar Receitas |	Permitir que o usuário cadastre, altere, exclua e busque receitas, compondo-as a partir de uma lista de ingredientes e quantidades. |
| RF4 |	Analisar Valor Nutricional	| Calcular e exibir o valor nutricional (calorias, macronutrientes, fibras, vitaminas, etc.) de alimentos, receitas, refeições e planos alimentares. |
| RF5 |	Montar Refeições e Planos Alimentares	| Permitir que o usuário crie refeições (ex: Café da Manhã, Almoço) e planos alimentares diários ou semanais, combinando receitas e alimentos. |
| RF6 |	Sugerir Receitas e Alimentos	| Oferecer sugestões de receitas e alimentos com base nas metas, preferências e restrições do usuário, e também com base nos ingredientes que ele possui. |

### 3.3.2 Requisitos Não Funcionais

| Código | Requisito Não Funcional (Restrição) |
|--------------------|------------------------------------|
| RNF1 | Usabilidade: A interface do sistema deve ser intuitiva, acessível e responsiva, adaptando-se a diferentes tamanhos de tela (desktops, tablets e celulares). |
| RNF2 | Desempenho: O tempo de resposta para buscas e cálculos nutricionais não deve exceder 10 segundos, garantindo uma experiência de usuário fluida. |
| RNF3 |	Confiabilidade da Base de Dados: A base de dados de alimentos deve utilizar fontes nutricionais reconhecidas e confiáveis (ex: Tabela TACO, USDA) ou APIs validadas para garantir a precisão das informações. |


### 3.3.3 Usuários 

| Ator | Descrição |
|--------------------|------------------------------------|
| Coordenador |	Usuário gerente do sistema responsável pelo cadastro e manutenção de cursos de aperfeiçoamento. Possui acesso geral ao sistema. |
| Secretaria |	Usuário responsável por registros de alunos, professores, turmas e gerência de matrículas. |
| ... |	... |	... |

## 3.4 Modelagem do Sistema

### 3.4.1 Diagrama de Casos de Uso
Como observado no diagrama de casos de uso da Figura 1, a secretária poderá gerenciar as matrículas e professores no sistema, enquanto o coordenador, além dessas funções, poderá gerenciar os cursos de aperfeiçoamento.

#### Figura 1: Diagrama de Casos de Uso do Sistema.

![dcu](https://github.com/user-attachments/assets/41f6b731-b44e-43aa-911f-423ad6198f47)
 
### 3.4.2 Descrições de Casos de Uso

Cada caso de uso deve ter a sua descrição representada nesta seção. Exemplo:

#### Gerenciar Professor (CSU01)

Sumário: A Secretária realiza a gestão (inclusão, remoção, alteração e consulta) dos dados sobre professores.

Ator Primário: Secretária.

Ator Secundário: Coordenador.

Pré-condições: A Secretária deve ser validada pelo Sistema.

Fluxo Principal:

1) 	A Secretária requisita manutenção de professores.
2) 	O Sistema apresenta as operações que podem ser realizadas: inclusão de um novo professor, alteração de um professor, a exclusão de um professor e a consulta de dados de um professor.
3) 	A Secretária seleciona a operação desejada: Inclusão, Exclusão, Alteração ou Consulta, ou opta por finalizar o caso de uso.
4) 	Se a Secretária desejar continuar com a gestão de professores, o caso de uso retorna ao passo 2; caso contrário o caso de uso termina.

Fluxo Alternativo (3): Inclusão

a)	A Secretária requisita a inclusão de um professor. <br>
b)	O Sistema apresenta uma janela solicitando o CPF do professor a ser cadastrado. <br>
c)	A Secretária fornece o dado solicitado. <br>
d)	O Sistema verifica se o professor já está cadastrado. Se sim, o Sistema reporta o fato e volta ao início; caso contrário, apresenta um formulário em branco para que os detalhes do professor (Código, Nome, Endereço, CEP, Estado, Cidade, Bairro, Telefone, Identidade, Sexo, Fax, CPF, Data do Cadastro e Observação) sejam incluídos. <br>
e)	A Secretária fornece os detalhes do novo professor. <br>
f)	O Sistema verifica a validade dos dados. Se os dados forem válidos, inclui o novo professor e a grade listando os professores cadastrados é atualizada; caso contrário, o Sistema reporta o fato, solicita novos dados e repete a verificação. <br>

Fluxo Alternativo (3): Remoção

a)	A Secretária seleciona um professor e requisita ao Sistema que o remova. <br>
b)	Se o professor pode ser removido, o Sistema realiza a remoção; caso contrário, o Sistema reporta o fato. <br>

Fluxo Alternativo (3): Alteração

a)	A Secretária altera um ou mais dos detalhes do professor e requisita sua atualização. <br>
b)	O Sistema verifica a validade dos dados e, se eles forem válidos, altera os dados na lista de professores, caso contrário, o erro é reportado. <br>
 
Fluxo Alternativo (3): Consulta

a)	A Secretária opta por pesquisar pelo nome ou código e solicita a consulta sobre a lista de professores. <br>
b)	O Sistema apresenta uma lista professores. <br>
c)	A Secretária seleciona o professor. <br>
d)	O Sistema apresenta os detalhes do professor no formulário de professores. <br>

Pós-condições: Um professor foi inserido ou removido, seus dados foram alterados ou apresentados na tela.

### 3.4.3 Diagrama de Classes 

A Figura 2 mostra o diagrama de classes do sistema. A Matrícula deve conter a identificação do funcionário responsável pelo registro, bem com os dados do aluno e turmas. Para uma disciplina podemos ter diversas turmas, mas apenas um professor responsável por ela.

#### Figura 2: Diagrama de Classes do Sistema.
 
![image](https://github.com/user-attachments/assets/abc7591a-b46f-4ea2-b8f0-c116b60eb24e)


### 3.4.4 Descrições das Classes 

| # | Nome | Descrição |
|--------------------|------------------------------------|----------------------------------------|
| 1	|	Aluno |	Cadastro de informações relativas aos alunos. |
| 2	| Curso |	Cadastro geral de cursos de aperfeiçoamento. |
| 3 |	Matrícula |	Cadastro de Matrículas de alunos nos cursos. |
| 4 |	Turma |	Cadastro de turmas.
| 5	|	Professor |	Cadastro geral de professores que ministram as disciplinas. |
| ... |	... |	... |
