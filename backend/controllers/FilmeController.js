import Filme from "../models/FilmeModel.js";

export const getFilmes = async (req, res) => {
    try {
        const filmes = await Filme.find();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getFilmeById = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        res.json(filme);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveFilme = async (req, res) => {
    const filme = new Filme(req.body);
    try {
        const insertedfilme = await filme.save();
        res.status(201).json(insertedfilme);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateFilme = async (req, res) => {
    try {
        const updatedfilme = await Filme.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedfilme);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteFilme = async (req, res) => {
    try {
        const deletedfilme = await Filme.deleteOne({_id:req.params.id});
        res.status(200).json(deletedfilme);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


export const showFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (filme) {
            res.json(filme);
        } else {
            res.status(404).json({ message: "Filme não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
