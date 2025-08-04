'use client'
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { ReactNode, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/utils/texts';
import { AuthLayout } from '../authLayout';
import { useRouter } from 'next/navigation';

interface LabelFormProps {
  label: string
}

const LabelForm: React.FC<LabelFormProps> = ({ label }) => {
  return (
    <Divider sx={{ paddingY: 2 }}>
      <Typography variant="subtitle2">
        {label}
      </Typography>
    </Divider>
  )
}

interface DivInputsProps {
  children: ReactNode
}

const DivInputs: React.FC<DivInputsProps> = ({ children }) => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      paddingBlock: 3
    }}>
      {children}
    </div>
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateMemorialClient() {
  const router = useRouter()

  // states para controle do formulário
  const [nome, setNome] = useState<string>('')
  const [cidade, setCidade] = useState<string>('')
  const [historia, setHistoria] = useState<string>('')
  const [dataNascimento, setDataNascimento] = useState<string>('')
  const [dataFalecimento, setDataFalecimento] = useState<string>('')
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null)
  const [fotoCapa, setFotoCapa] = useState<File | null>(null)
  const [fotosMemorial, setFotosMemorial] = useState<File[]>([])
  const [nomeAutor, setNomeAutor] = useState<string>('')
  const [autor, setAutor] = useState<string>('')
  const [contatoAutor, setContatoAutor] = useState<string>('')

  // states para controle de visualização de fotos
  const [previewFotoPerfil, setPreviewFotoPerfil] = useState<string | null>(null)
  const [previewFotoCapa, setPreviewFotoCapa] = useState<string | null>(null)


  // fazendo upload de fotos selecionadas
  const enviarImagemAPI = async (file: File): Promise<number | null> => {
    const formData = new FormData()
    formData.append('files', file)

    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData)
      return res.data[0].id
    } catch (err) {
      console.error('Erro ao enviar imagem:', err)
      return null
    }
  }

  const criarMemorial = async () => {
    try {
      const capaId = fotoCapa ? await enviarImagemAPI(fotoCapa) : null
      const perfilId = fotoPerfil ? await enviarImagemAPI(fotoPerfil) : null

      const galeriaIds: number[] = []
      for (const img of fotosMemorial) {
        const id = await enviarImagemAPI(img)
        if (id) galeriaIds.push(id)
      }

      const memorial = {
        data: {
          nome,
          cidade,
          historia,
          data_nascimento: dataNascimento,
          data_falecimento: dataFalecimento,
          foto_capa: capaId,
          foto_perfil: perfilId,
          fotos_memorial: galeriaIds,
          nome_autor: nomeAutor,
          autor,
          contato_autor: contatoAutor
        }
      }

      console.log(memorial)

      await axios.post(`${API_URL}/api/memorials`, memorial)

      alert('Memorial criado com sucesso!')
      router.push('/explore')
    } catch (err) {
      console.error('Erro ao criar memorial:', err)
      alert('Erro ao criar memorial.')
    }
  }


  return (
    <AuthLayout>

      <Box bgcolor='#FDFAF6' sx={{ paddingTop: 12, minHeight: '100vh', maxHeight: '100%' }}>
        <Navbar paginaAtual="Criar memorial" />

        <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h4">
            Criar um novo memorial
          </Typography>

          <Typography variant="body1" textAlign={'center'}>
            Preencha os campos para criar um memorial personalizado.
            Adicione fotos, datas marcantes e uma biografia que compartilhe momentos especiais dessa vida.
            Você poderá atualizar as informações sempre que quiser.
          </Typography>

          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
            noValidate
            autoComplete="off"
          >
            <LabelForm label="Dados pessoais" />
            <DivInputs>
              <TextField label="Nome do ente querido" id="outlined-size-normal" color="primary" focused onChange={(e) => setNome(e.target.value)} />
              <TextField label="Cidade" id="outlined-size-normal" color="primary" focused onChange={(e) => setCidade(e.target.value)} />
            </DivInputs>
            <DivInputs>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {fotoPerfil ? 'Alterar foto de perfil' : 'Foto de perfil'}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      setFotoPerfil(file)
                      setPreviewFotoPerfil(URL.createObjectURL(file))
                    }
                  }}
                />
              </Button>
              {previewFotoPerfil && (
                <img
                  src={previewFotoPerfil}
                  alt="Preview foto de perfil"
                  style={{ maxHeight: 150, borderRadius: 8, marginTop: 8 }}
                />
              )}

              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {fotoCapa ? 'Alterar foto de capa' : 'Foto de capa'}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      setFotoCapa(file)
                      setPreviewFotoCapa(URL.createObjectURL(file))
                    }
                  }}
                />
              </Button>

              {previewFotoCapa && (
                <img
                  src={previewFotoCapa}
                  alt="Preview foto de capa"
                  style={{ maxHeight: 150, borderRadius: 8, marginTop: 8 }}
                />
              )}

            </DivInputs>

            <LabelForm label="Vida" />
            <DivInputs>
              <TextField label="Data de nascimento" id="outlined-size-normal" color="primary" focused type='date' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              <TextField label="Data de falecimento" id="outlined-size-normal" color="primary" focused type='date' value={dataFalecimento} onChange={(e) => setDataFalecimento(e.target.value)} />
            </DivInputs>
            <DivInputs>
              <TextField
                label="História"
                multiline
                rows={4}
                focused
                onChange={(e) => setHistoria(e.target.value)}
              />
            </DivInputs>

            <DivInputs>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={(e) => {
                  const input = e.target as HTMLInputElement
                  const files = input.files
                  if (files) setFotosMemorial(Array.from(files))
                }}
              >
                Imagens
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>

              {fotosMemorial.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                  {fotosMemorial.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${i}`}
                      style={{ height: 100, borderRadius: 4 }}
                    />
                  ))}
                </Box>
              )}

            </DivInputs>

            <LabelForm label="Dados do responsável" />
            <DivInputs>
              <TextField label="Nome do responsável" id="outlined-size-normal" color="primary" focused onChange={(e) => setNomeAutor(e.target.value)} />
              <TextField label="Contato do responsável" id="outlined-size-normal" color="primary" focused onChange={(e) => setContatoAutor(e.target.value)} />
            </DivInputs>
            <DivInputs>
              <TextField label="E-mail" id="outlined-size-normal" color="primary" focused type='email' onChange={(e) => setAutor(e.target.value)} />
              {/* <TextField label="Confirme o e-mail" id="outlined-size-normal" color="primary" focused type='email' /> */}
            </DivInputs>

            <DivInputs>
              <Button variant='contained' color='secondary' sx={{ color: 'white' }} startIcon={<AddIcon />} onClick={() => {
                criarMemorial()
              }}>Criar</Button>
            </DivInputs>

          </Box>
        </Container>

      </Box>
    </AuthLayout>
  )
}