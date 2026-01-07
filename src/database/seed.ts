import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../entities/user.entity';
import { PostsService } from '../posts/posts.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const postsService = app.get(PostsService);

  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Criar professores
    console.log('👨‍🏫 Criando professores...');

    const professor1 = await authService.register({
      email: 'prof.silva@escola.com',
      password: '123456',
      name: 'Prof. João Silva',
      role: UserRole.PROFESSOR,
    });

    const professor2 = await authService.register({
      email: 'prof.maria@escola.com',
      password: '123456',
      name: 'Prof. Maria Santos',
      role: UserRole.PROFESSOR,
    });

    const professor3 = await authService.register({
      email: 'prof.carlos@escola.com',
      password: '123456',
      name: 'Prof. Carlos Oliveira',
      role: UserRole.PROFESSOR,
    });

    // Criar alunos
    console.log('👨‍🎓 Criando alunos...');

    await authService.register({
      email: 'ana.costa@aluno.com',
      password: '123456',
      name: 'Ana Costa',
      role: UserRole.ALUNO,
    });

    await authService.register({
      email: 'pedro.ferreira@aluno.com',
      password: '123456',
      name: 'Pedro Ferreira',
      role: UserRole.ALUNO,
    });

    await authService.register({
      email: 'lucia.martins@aluno.com',
      password: '123456',
      name: 'Lúcia Martins',
      role: UserRole.ALUNO,
    });

    await authService.register({
      email: 'rafael.lima@aluno.com',
      password: '123456',
      name: 'Rafael Lima',
      role: UserRole.ALUNO,
    });

    await authService.register({
      email: 'camila.souza@aluno.com',
      password: '123456',
      name: 'Camila Souza',
      role: UserRole.ALUNO,
    });

    // Criar posts
    console.log('📝 Criando posts...');

    await postsService.create(
      {
        title: 'Introdução à Programação Web',
        content:
          'Nesta aula vamos aprender os conceitos básicos de desenvolvimento web, incluindo HTML, CSS e JavaScript. É importante entender que o desenvolvimento web moderno envolve muitas tecnologias trabalhando juntas para criar experiências ricas para os usuários.',
      },
      professor1,
    );

    await postsService.create(
      {
        title: 'Banco de Dados Relacionais',
        content:
          'Os bancos de dados relacionais são fundamentais para qualquer aplicação moderna. Neste post, vamos explorar conceitos como normalização, chaves primárias e estrangeiras, e como criar consultas SQL eficientes.',
      },
      professor1,
    );

    await postsService.create(
      {
        title: 'Algoritmos e Estruturas de Dados',
        content:
          'O estudo de algoritmos e estruturas de dados é essencial para qualquer programador. Vamos abordar algoritmos de ordenação, busca, e estruturas como árvores, listas ligadas e grafos.',
      },
      professor2,
    );

    await postsService.create(
      {
        title: 'Desenvolvimento Mobile com React Native',
        content:
          'React Native permite criar aplicações móveis usando JavaScript e React. É uma tecnologia poderosa que permite desenvolver para iOS e Android com uma única base de código.',
      },
      professor2,
    );

    await postsService.create(
      {
        title: 'Segurança em Aplicações Web',
        content:
          'A segurança deve ser uma prioridade desde o início do desenvolvimento. Vamos discutir principais vulnerabilidades como SQL Injection, XSS, CSRF e como preveni-las usando boas práticas de programação.',
      },
      professor3,
    );

    await postsService.create(
      {
        title: 'APIs RESTful e GraphQL',
        content:
          'APIs são a espinha dorsal das aplicações modernas. Vamos comparar REST e GraphQL, discutir quando usar cada um, e implementar exemplos práticos de ambas as abordagens.',
      },
      professor3,
    );

    await postsService.create(
      {
        title: 'DevOps e Deploy de Aplicações',
        content:
          'DevOps une desenvolvimento e operações para acelerar entregas. Vamos aprender sobre CI/CD, Docker, Kubernetes, e como automatizar o processo de deploy de aplicações.',
      },
      professor1,
    );

    await postsService.create(
      {
        title: 'Testes Automatizados',
        content:
          'Testes são cruciais para manter a qualidade do código. Abordaremos testes unitários, de integração e end-to-end, além de ferramentas como Jest, Cypress e estratégias de TDD.',
      },
      professor2,
    );

    console.log('✅ Seed concluído com sucesso!');
    console.log('\n📊 Dados criados:');
    console.log('👨‍🏫 3 Professores');
    console.log('👨‍🎓 5 Alunos');
    console.log('📝 8 Posts');
    console.log('\n🔑 Credenciais de acesso:');
    console.log('Professor: prof.silva@escola.com / 123456');
    console.log('Professor: prof.maria@escola.com / 123456');
    console.log('Professor: prof.carlos@escola.com / 123456');
    console.log('Aluno: ana.costa@aluno.com / 123456');
    console.log('Aluno: pedro.ferreira@aluno.com / 123456');
    console.log('(e mais 3 alunos...)');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error.message);
  }

  await app.close();
}

seed();
